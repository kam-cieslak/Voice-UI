package org.example.voice_ui.document;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Getter
public abstract class AbstractDocument {

    @Id
    @Setter(AccessLevel.NONE)
    private ObjectId id;

}
